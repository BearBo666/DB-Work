package helpers

import (
	"crypto/hmac"
	"crypto/sha256"
	"encoding/hex"
)

func Sha256Crypto(str string) string {

	secret := "Wust2021"

	h := hmac.New(sha256.New, []byte(secret))

	h.Write([]byte("!@" + str + "@."))

	return hex.EncodeToString(h.Sum(nil))
}
