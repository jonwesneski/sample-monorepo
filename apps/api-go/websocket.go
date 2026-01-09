package main

import (
	"encoding/json"
	"net/http"

	"github.com/gorilla/websocket"
	"github.com/jonwesneski/sample-monorepo/apps/api-go/types"
)


var upgrader = websocket.Upgrader{
	CheckOrigin: func(r* http.Request) bool {
		return true
	},
}

func wsHandler(out <-chan types.Event) http.HandlerFunc {
	return func(w http.ResponseWriter, r* http.Request) {
		conn, _ := upgrader.Upgrade(w, r, nil)
		defer conn.Close()

		for event := range out {
			data, _ := json.Marshal(event)
			conn.WriteMessage(websocket.TextMessage, data)
		}
	}
}