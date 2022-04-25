package main

import (
	"ipfs/api"
	"ipfs/config"
	"log"
)

func main() {

	// Load configuration settings.
	config, err := config.Load(".")
	if err != nil {
		log.Fatal("Failed to load config: ", err)
	}

	// Create a server and setup routes.
	server, err := api.NewServer(config)
	if err != nil {
		log.Fatal("Failed to create a server: ", err)
	}

	// Start a server.
	if err := server.Start(config.ServerAddress); err != nil {
		log.Fatal("Failed to start a server: ", err)
	}
}
