package main

import (
  "fmt"
  "net"
  "os"
)

const (
  CONN_HOST = "0.0.0.0"
  CONN_PORT = "8888"
  CONN_TYPE = "tcp"
)

func main() {
  // Listen for incoming connections.
  l, err := net.Listen(CONN_TYPE, CONN_HOST+":"+CONN_PORT)
  if err != nil {
    fmt.Println("Error listening: ", err.Error())
    os.Exit(1)
  }
  // Close the listener when the application closes.
  defer l.Close()
  fmt.Println("Listening on " + CONN_HOST + ";" +CONN_PORT)
  for {
    // Listen for an incoming connection.
    conn, err := l.Accept()
    if err != nil {
      fmt.Println("Error accepting: " + err.Error())
      os.Exit(1)
    }
    go handleReq(conn)
  }
}

// Handles incoming requests.
func handleReq(conn net.Conn) {
  // Make a buffer to hold incoming data.
  buf := make([]byte, 1024)
  // read the incomeing connection into the buffer
  reqLen, err := conn.Read(buf)
  if err != nil {
    fmt.Println("Error reading: ", err.Error())
  }
  //fmt.Println(reqLen);
  if (reqLen > 0){
    fmt.Printf("%s\n", buf);
  }
  // for i := 0; i < reqLen; i++ {
  //   fmt.Println(buf[i])
  // }
  // Send
  conn.Write([]byte("Message received."))
  // CLose the connection
  conn.Close()
}
