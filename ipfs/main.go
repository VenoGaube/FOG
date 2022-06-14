package main

import (
	"ipfs/api"
	"ipfs/config"
	"ipfs/model"
	"log"
)

func main() {

	// Load configuration settings.
	config, err := config.Load(".")
	if err != nil {
		log.Fatal("Failed to load config: ", err)
	}

	// Connect to IPFS node.
	store, err := model.Connect(config.IpfsAddress)
	if err != nil {
		log.Fatal("Failed to connect to IPFS node: ", err)
	}

	// Create a server and setup routes.
	server, err := api.NewServer(config, store)
	if err != nil {
		log.Fatal("Failed to create a server: ", err)
	}

	// Start a server.
	if err := server.Start(config.ServerAddress); err != nil {
		log.Fatal("Failed to start a server: ", err)
	}
}
