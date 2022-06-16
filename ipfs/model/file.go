package model

import (
	"fmt"
	"io/ioutil"
	"net/http"
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
	return
}
