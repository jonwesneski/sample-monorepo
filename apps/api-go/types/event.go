package types

import "time"

type Event struct{
	ID string `json:"id"`
	CreatedAt time.Time `json:"createdAt"`
	DeadlineMs int64 `json:"deadlineMs"`
	ProcessedAt *time.Time `json:"processedAt,omitempty"`
	Status string `json:"status"`
}