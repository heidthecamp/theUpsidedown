package main

import (
	"encoding/json"
	"fmt"
    "log"
	"net/http"
	"strconv"
	"github.com/gorilla/mux"
)


type Message struct {
	ID		int		`json:"id,omitempty"`
	Content	string	`json:"content,omitempty"`
}

var message_arr []Message

// our main function
func main() {

	message_arr = append(message_arr, Message{ID: 1, Content: "Hello World!"})


	router := mux.NewRouter()

	router.HandleFunc("/upsidedown", GetMessages).Methods("GET")
	router.HandleFunc("/upsidedown/{id}", GetMessage).Methods("GET")
	router.HandleFunc("/upsidedown", CreateMessage).Methods("POST")
	router.HandleFunc("/upsidedown/{id}", DeleteMessage).Methods("DELETE")

    log.Fatal(http.ListenAndServe(":8081", router))
}

func genId() (id int){
	if len(message_arr) == 0 {
		id = 1
		return
	}
	id = (message_arr[len(message_arr)-1].ID + 1)
	return 
}

func CreateMessage(w http.ResponseWriter, r *http.Request) {
	// params := mux.Vars(r)
	var message Message
	_ = json.NewDecoder(r.Body).Decode(&message)

	message.ID = genId()


	message_arr = append(message_arr, message)
	json.NewEncoder(w).Encode(message_arr)
}


func DeleteMessage(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	
	sId, err := strconv.Atoi(params["id"])
	if err != nil {
		fmt.Println(err)
		json.NewEncoder(w).Encode(err)
	}	

	for index, message := range message_arr {
		if message.ID == sId{
			message_arr = append(message_arr[:index], message_arr[index + 1:]...)
			json.NewEncoder(w).Encode(message_arr)
		}
	}
}


func GetMessage(w http.ResponseWriter, r *http.Request){
	params := mux.Vars(r)

	sId, err := strconv.Atoi(params["id"])
	if err != nil {
		fmt.Println(err)
		json.NewEncoder(w).Encode(err)
	}	

	for _, message := range message_arr {
		if message.ID == sId{
			json.NewEncoder(w).Encode(message)
		}	
	}	
}	


func GetMessages(w http.ResponseWriter, r *http.Request) {
	json.NewEncoder(w).Encode(message_arr)
}	

