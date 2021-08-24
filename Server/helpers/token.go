package helpers

import (
	"DB-Server/config"
	"time"

	"github.com/dgrijalva/jwt-go"
)

type Claim struct {
	UserId int
	jwt.StandardClaims
}

// 签发token
func SignToken(userId int) (string, error) {
	var (
		secret = config.Setting.JwtSecret
		// timeout = config.Setting.JwtTimeout
	)

	expireTime := time.Now().Add(time.Hour * 7)

	claims := Claim{
		UserId: userId,
		StandardClaims: jwt.StandardClaims{
			// 过期时间
			ExpiresAt: expireTime.Unix(),
			// 指定token发行人
			Issuer: "Wust",
		},
	}

	tokenClaim := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	return tokenClaim.SignedString([]byte(secret))
}

// 验证token
func VerifyToken(token string) (*Claim, error) {
	var (
		secret = config.Setting.JwtSecret
	)

	claim := &Claim{}

	_, err := jwt.ParseWithClaims(token, claim, func(token *jwt.Token) (interface{}, error) {
		return []byte(secret), nil
	})
	return claim, err
}
