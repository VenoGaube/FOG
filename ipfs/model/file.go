package model

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"io/ioutil"
	"mime/multipart"
	"net/http"
	"time"
)

type IpfsResponse struct {
	Bytes int64  `json:"Bytes"`
	Hash  string `json:"Hash"`
	Name  string `json:"Name"`
	Size  string `json:"Size"`
}

func (store *Store) GetFileByCID(cid string) (content []byte, err error) {

	url := fmt.Sprintf("%s/api/v0/cat?arg=%s", store.address, cid)
	resp, err := http.Post(url, "application/json", nil)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	content, err = ioutil.ReadAll(resp.Body)
	if err != nil {
		return
	}

	return
}

func (store *Store) CreateFile(content []byte) (cid string, err error) {

	var b bytes.Buffer

	w := multipart.NewWriter(&b)

	var fw io.Writer
	if fw, err = w.CreateFormFile("file", "publication.pdf"); err != nil {
		return
	}

	if _, err = io.Copy(fw, bytes.NewReader(content)); err != nil {
		return
	}

	if err = w.Close(); err != nil {
		return
	}

	url := fmt.Sprintf("%s/api/v0/add", store.address)
	req, err := http.NewRequest("POST", url, &b)
	if err != nil {
		return
	}

	req.Header.Set("Content-Type", w.FormDataContentType())
	var client *http.Client = &http.Client{Timeout: time.Duration(5) * time.Second}

	resp, err := client.Do(req)
	if err != nil {
		return
	}
	defer resp.Body.Close()

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return
	}

	var ipfs IpfsResponse
	if err = json.Unmarshal(body, &ipfs); err != nil {
		return
	}

	cid = ipfs.Hash

	return
}
