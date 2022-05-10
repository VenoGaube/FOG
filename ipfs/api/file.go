package api

import (
	"log"
	"mime/multipart"
	"net/http"

	"github.com/gin-gonic/gin"
)

type getFileRequest struct {
	CID string `uri:"cid" binding:"required"`
}

type createFileRequest struct {
	File *multipart.FileHeader `form:"file" binding:"required"`
}

func (server *Server) GetFileByCID(ctx *gin.Context) {

	var req getFileRequest
	if err := ctx.ShouldBindUri(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"message": err})
		ctx.Abort()
		return
	}

	result, err := server.store.GetFileByCID(req.CID)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"message": err})
		ctx.Abort()
		return
	}

	ctx.JSON(http.StatusOK, result)
}

func (server *Server) UploadFile(ctx *gin.Context) {

	var req createFileRequest
	if err := ctx.ShouldBind(&req); err != nil {
		log.Println(err)
		ctx.JSON(http.StatusBadRequest, gin.H{"message": err})
		ctx.Abort()
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"message": req.File.Size})
}
