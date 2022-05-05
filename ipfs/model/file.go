package model

import (
	"fmt"
	"io/ioutil"
	"net/http"
)

type IpfsFile struct {
	CID  string `json:"cid"`
	Data []byte `json:"data"`
}

type CreateFileParam struct {
	File []byte
}

type CreateFileIpfsResponse struct {
	Bytes int64  `json:"Bytes"`
	Hash  string `json:"Hash"`
	Name  string `json:"Name"`
	Size  string `json:"Size"`
}

func (store *Store) GetFileByCID(cid string) (*IpfsFile, error) {

	// QmcfFS2MFVJRvn6ZLKPSDga69BxipAyo3hnmRHjjPfVjkU
	url := fmt.Sprintf("%s/api/v0/cat?arg=%s", store.address, cid)
	resp, err := http.Post(url, "application/json", nil)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return nil, err
	}

	file := &IpfsFile{
		CID:  cid,
		Data: body,
	}

	return file, nil
}

func (store *Store) CreateFile() {
	//url := fmt.Sprintf("%s/api/v0/cat?arg=%s", store.address)
}
