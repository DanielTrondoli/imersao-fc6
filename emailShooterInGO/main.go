package main

import (
	"encoding/json"
	"fmt"

	"github.com/DanielTrondoli/emailshooteringo/email"
	myKafka "github.com/DanielTrondoli/emailshooteringo/kafka"
	"github.com/confluentinc/confluent-kafka-go/kafka"
	"gopkg.in/mail.v2"
)

func main() {
	var emailCh = make(chan email.Email)
	var msgChan = make(chan *kafka.Message)

	d := mail.NewDialer("smtp.mailgun.org", 587, "danielt.monitora@gmail.com", "m7s_!6N8W9F!xhE")

	es := email.NewMailSender()
	es.From = "trondoli2@gmail.com"
	es.Dialer = d

	go es.Send(emailCh)

	configMap := &kafka.ConfigMap{
		"bootstrap.servers": "kafka:9094",
		"client.id":         "emailapp",
		"group.id":          "emailapp",
	}

	topics := []string{"emails"}

	consumer := myKafka.NewConsumer(configMap, topics)
	go consumer.Consume(msgChan)

	fmt.Println("Consumindo msg")
	for msg := range msgChan {
		var input email.Email
		fmt.Println("Mensagem Recebida: ", msg.Value, " ----> ", input)
		json.Unmarshal(msg.Value, &input)
		emailCh <- input
	}
}
