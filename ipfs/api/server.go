package api

import (
	"ipfs/config"

	"github.com/gin-gonic/gin"
)

type Server struct {
	config config.Config
	router *gin.Engine
}

func NewServer(config config.Config) (*Server, error) {

	gin.SetMode(config.GinMode)
	router := gin.Default()

	server := &Server{
		config: config,
	}

	// Setup health check routes.
	health := router.Group("health")
	{
		health.GET("/live", server.Live)
		health.GET("/ready", server.Ready)
	}

	server.router = router
	return server, nil
}

func (server *Server) Start(address string) error {
	return server.router.Run(address)
}
