package main

import (
	"time"

	"github.com/google/uuid"

	"github.com/jonwesneski/sample-monorepo/apps/api-go/types"
)

func startGenerator(out chan<- types.Event) {
	ticker := time.NewTicker(50 * time.Millisecond)
	defer ticker.Stop()

	for range ticker.C {
		event:= types.Event {
			ID: uuid.New().String(),
			CreatedAt: time.Now(),
			DeadlineMs: 50,
		}

		select {
		case out <- event:
		default:
		}
	}

}