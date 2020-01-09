package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
	// "github.com/go-swagger/go-swagger/httpkit/validate to github.com/go-openapi/validate"
	// "github.com/go-swagger/go-swagger/httpkit"
	// "github.com/go-swagger/go-swagger/"
)

type Message struct {
	ID      int    `json:"id,omitempty"`
	Content string `json:"content,omitempty"`
}

var message_arr []Message

// our main function
func main() {

	message_arr = append(message_arr, Message{ID: 1, Content: "Hello World!"})

	router := mux.NewRouter()

	router.HandleFunc("/", IsUp).Methods("GET")
	router.HandleFunc("/upsidedown", GetOptions).Methods("OPTIONS")
	router.HandleFunc("/upsidedown", GetMessages).Methods("GET")
	router.HandleFunc("/upsidedown/{id}", GetMessage).Methods("GET")
	router.HandleFunc("/upsidedown/", CreateMessage).Methods("POST")
	router.HandleFunc("/upsidedown/{id}", DeleteMessage).Methods("DELETE")
	router.HandleFunc("/upsidedown/", GetOptions).Methods("OPTIONS")

	fmt.Println("Listening on localhost:8081")
	log.Fatal(http.ListenAndServe(":8081", router))
}

func genId() (id int) {
	if len(message_arr) == 0 {
		id = 1
		return
	}
	id = (message_arr[len(message_arr)-1].ID + 1)
	return
}

func CreateMessage(w http.ResponseWriter, r *http.Request) {
	SetCORSHeaders(w)

	w.WriteHeader(http.StatusOK)

	// params := mux.Vars(r)
	var message Message
	_ = json.NewDecoder(r.Body).Decode(&message)
	print, _ := json.Marshal(message)
	log.Println(string(print))

	message.ID = genId()

	message_arr = append(message_arr, message)
	enc := json.NewEncoder(w)
	enc.SetIndent("", "  ")
	enc.Encode(message)
	print, _ = json.Marshal(message)
	log.Println(string(print))
}

func DeleteMessage(w http.ResponseWriter, r *http.Request) {
	SetCORSHeaders(w)

	params := mux.Vars(r)

	sId, err := strconv.Atoi(params["id"])
	if err != nil {
		fmt.Println(err)
		json.NewEncoder(w).Encode(err)
		print, _ := json.Marshal(err)
		log.Println(string(print))
	}

	for index, message := range message_arr {
		if message.ID == sId {
			message_arr = append(message_arr[:index], message_arr[index+1:]...)
			json.NewEncoder(w).Encode(message_arr)
			print, _ := json.Marshal(message_arr)
			log.Println(string(print))
		}
	}
}

func GetMessage(w http.ResponseWriter, r *http.Request) {
	SetCORSHeaders(w)

	header := w.Header()
	header.Add("Access-Control-Allow-Origin", "*")
	header.Add("Access-Control-Allow-Methods", "DELETE, POST, GET, OPTIONS")
	header.Add("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With")
	header.Add("Content-Type", "application/json; charset=utf-8")

	params := mux.Vars(r)

	sId, err := strconv.Atoi(params["id"])
	if err != nil {
		fmt.Println(err)
		json.NewEncoder(w).Encode(err)
		print, _ := json.Marshal(err)
		log.Println(string(print))
	}

	for _, message := range message_arr {
		if message.ID == sId {
			json.NewEncoder(w).Encode(message)
			print, _ := json.Marshal(message)
			log.Println(string(print))
		}
	}
}

func GetMessages(w http.ResponseWriter, r *http.Request) {
	SetCORSHeaders(w)

	enc := json.NewEncoder(w)
	enc.SetIndent("", "  ")
	enc.Encode(message_arr)
	print, _ := json.Marshal(message_arr)
	log.Println(string(print))
}

func GetOptions(w http.ResponseWriter, r *http.Request) {
	return
}

func IsUp(w http.ResponseWriter, r *http.Request) {
	SetCORSHeaders(w)

	enc := json.NewEncoder(w)
	enc.SetIndent("", "  ")
	enc.Encode("The server is up")
	print, _ := json.Marshal("The server is up")
	log.Println(string(print))
}

func SetCORSHeaders(w http.ResponseWriter) {
	header := w.Header()
	// (*w).Header().Set("Access-Control-Allow-Origin", "*")
	header.Set("Access-Control-Allow-Origin", "*")
	header.Set("Access-Control-Allow-Methods", "DELETE, POST, GET, OPTIONS")
	header.Set("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With")
	header.Set("Content-Type", "application/json; charset=utf-8")
}
