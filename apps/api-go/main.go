package main

import (
	"log"
	"net/http"

	"github.com/jonwesneski/sample-monorepo/apps/api-go/types"
)

func main() {
	in := make(chan types.Event, 50)
	out := make(chan types.Event, 50)

	go startGenerator(in)

	go func() {
		for event := range in {
			out <- processEvent(event)
		}
	}()

	http.HandleFunc("/ws", wsHandler(out))

	log.Println("Event server running on :8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}