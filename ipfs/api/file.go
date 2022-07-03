package api

import (
	"io/ioutil"
	"net/http"

	"github.com/gin-gonic/gin"
)

type getFileRequest struct {
	CID string `uri:"cid" binding:"required"`
}

type createFileResponse struct {
	CID string `json:"cid"`
}

func (server *Server) GetFileByCID(ctx *gin.Context) {

	var req getFileRequest
	if err := ctx.ShouldBindUri(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"message": err})
		ctx.Abort()
		return
	}

	content, err := server.store.GetFileByCID(req.CID)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"message": err})
		ctx.Abort()
		return
	}

	ctx.Data(http.StatusOK, "application/octet-stream", content)
}

func (server *Server) UploadFile(ctx *gin.Context) {

	content, err := ioutil.ReadAll(ctx.Request.Body)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"message": err})
		ctx.Abort()
		return
	}

	cid, err := server.store.CreateFile(content)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"message": err})
		ctx.Abort()
		return
	}

	resp := &createFileResponse{
		CID: cid,
	}

	ctx.JSON(http.StatusCreated, resp)
}
