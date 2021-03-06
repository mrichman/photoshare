package photoshare

import (
	"encoding/json"
	"fmt"
	"github.com/juju/errgo"
	"net/http"
	"strconv"
	"strings"
)

func writeBody(w http.ResponseWriter, body []byte, status int, contentType string) error {
	w.Header().Set("Content-Type", contentType+"; charset=UTF8")
	w.Header().Set("Content-Length", strconv.Itoa(len(body)))
	w.WriteHeader(status)
	_, err := w.Write(body)
	return errgo.Mask(err)
}

func renderJSON(w http.ResponseWriter, value interface{}, status int) error {
	body, err := json.Marshal(value)
	if err != nil {
		return errgo.Mask(err)
	}
	return writeBody(w, body, status, "application/json")
}

func renderString(w http.ResponseWriter, status int, msg string) error {
	return writeBody(w, []byte(msg), status, "text/plain")
}

func getScheme(r *http.Request) string {
	if r.TLS == nil {
		return "http"
	}
	return "https"
}

func getBaseURL(r *http.Request) string {
	return fmt.Sprintf("%s://%s", getScheme(r), r.Host)
}

func decodeJSON(r *http.Request, value interface{}) error {
	return errgo.Mask(json.NewDecoder(r.Body).Decode(value))
}

// Converts a Pg Array (returned as string) to an int slice
func pgArrToIntSlice(pgArr string) []int64 {
	var items []int64

	s := strings.TrimRight(strings.TrimLeft(pgArr, "{"), "}")

	for _, value := range strings.Split(s, ",") {
		if item, err := strconv.Atoi(strings.Trim(value, " ")); err == nil {
			items = append(items, int64(item))
		}
	}
	return items
}

// Converts an int slice to a Pg Array string
func intSliceToPgArr(items []int64) string {
	var s []string
	for _, value := range items {
		s = append(s, strconv.FormatInt(value, 10))
	}
	return "{" + strings.Join(s, ",") + "}"
}

func getPage(r *http.Request) *page {
	pageNum, err := strconv.ParseInt(r.FormValue("page"), 10, 64)
	if err != nil {
		pageNum = 1
	}
	return newPage(pageNum)
}
