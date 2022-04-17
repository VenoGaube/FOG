package api

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func (server *Server) Live(ctx *gin.Context) {
	ctx.JSON(http.StatusOK, gin.H{"status": "UP"})
}

func (server *Server) Ready(ctx *gin.Context) {
	ctx.JSON(http.StatusOK, gin.H{"status": "UP"})
}
