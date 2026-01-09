package main

import (
	"context"
	"log"
	"time"

	"github.com/jonwesneski/sample-monorepo/apps/api-go/types"
)

func processEvent(event types.Event) types.Event {
	ctx, cancel := context.WithTimeout(
		context.Background(), time.Duration(event.DeadlineMs)*time.Millisecond)

	defer cancel()
	workDone := make(chan struct{})

	go func() {
		time.Sleep(30 * time.Millisecond)
		close(workDone)
	}()

	select {
	case <- workDone:
		now:= time.Now()
		event.ProcessedAt = &now
		event.Status = "on-time"
	case <- ctx.Done():
		event.Status = "late"
	}

	log.Printf("New event processed: %v", event)
	
	return event
}