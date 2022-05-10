package api

import (
	"ipfs/config"
	"ipfs/model"

	"github.com/gin-gonic/gin"
)

type Server struct {
	config config.Config
	router *gin.Engine
	store  *model.Store
}

func NewServer(config config.Config, store *model.Store) (*Server, error) {

	gin.SetMode(config.GinMode)
	router := gin.Default()

	server := &Server{
		config: config,
		store:  store,
	}

	// Setup routing for server.
	v1 := router.Group("v1")
	{
		v1.GET("/file/:cid", server.GetFileByCID)
		v1.POST("/file", server.UploadFile)
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
