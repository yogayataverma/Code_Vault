// forms.go
package main

import (
	"context"
	"database/sql"
	"fmt"
	"html/template"
	"log"
	"net/http"

	_ "github.com/go-sql-driver/mysql"
)

type ContactDetails struct {
	Email   string
	Subject string
	Message string
}

type ContactDetailsID struct {
	ID      string
	Email   string
	Subject string
	Message string
}

func errCheck(err error) {
	if err != nil {
		log.Fatal(err)
	}
}

func main() {
	tmpl := template.Must(template.ParseFiles("forms.html"))

	db, err := sql.Open("mysql", "root:@tcp(localhost:3307)/go")
	defer db.Close()
	errCheck(err)

	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		if r.Method != http.MethodPost {
			tmpl.Execute(w, nil)
			return
		}

		details := ContactDetails{
			Email:   r.FormValue("email"),
			Subject: r.FormValue("subject"),
			Message: r.FormValue("message"),
		}

		// do something with details
		_ = details

		query := "INSERT INTO `form` (`email`, `subject`, `message`) VALUES (?, ?, ?)"
		insertResult, err := db.ExecContext(context.Background(), query, details.Email, details.Subject, details.Message)
		if err != nil {
			log.Fatalf("impossible insert form data: %s", err)
		}
		id, err := insertResult.LastInsertId()
		if err != nil {
			log.Fatalf("impossible to retrieve last inserted id: %s", err)
		}
		log.Printf("inserted id: %d", id)

		fmt.Println(details.Email)

		todos, err := db.Query("SELECT * FROM form")
		errCheck(err)

		var ext = ContactDetailsID{
			ID:      "1",
			Email:   "Abc",
			Subject: "abc",
			Message: "abc",
		}

		for todos.Next() {
			var todo ContactDetailsID
			err = todos.Scan(&todo.ID, &todo.Email, &todo.Subject, &todo.Message)
			errCheck(err)
			ext = todo
			fmt.Println(ext)
		}

		tmpl.Execute(w, struct{ Success bool }{true})
	})

	http.ListenAndServe(":8080", nil)
}
