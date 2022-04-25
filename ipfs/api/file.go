package api

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func (server *Server) GetFileByCID(ctx *gin.Context) {
	ctx.JSON(http.StatusOK, gin.H{"message": "kinda works"})
}

func (server *Server) UploadFile(ctx *gin.Context) {
	ctx.JSON(http.StatusOK, gin.H{"message": "kinda works"})
}
