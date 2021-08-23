package helpers

import (
	"DB-Server/config"
	"time"

	"github.com/dgrijalva/jwt-go"
)

type Claim struct {
	Username string
	jwt.StandardClaims
}

var (
	secret  = config.Setting.JwtSecret
	timeout = config.Setting.JwtTimeout * 60 * 60
)

// 签发token
func SignToken(username string) (string, error) {
	expireTime := time.Now().Add(time.Duration(timeout))

	claims := Claim{
		Username: username,
		StandardClaims: jwt.StandardClaims{
			// 过期时间
			ExpiresAt: expireTime.Unix(),
			// 指定token发行人
			Issuer: "Wust",
		},
	}

	tokenClaim := jwt.NewWithClaims(jwt.SigningMethodES256, claims)

	return tokenClaim.SignedString(secret)
}

// 验证token
func VerifyToken(token string) (*Claim, error) {
	tokenClaims, err := jwt.ParseWithClaims(token, &Claim{}, func(token *jwt.Token) (interface{}, error) {
		return secret, nil
	})

	if tokenClaims != nil {
		// 从tokenClaims中获取到Claims对象，并使用断言，将该对象转换为我们自己定义的Claims
		// 要传入指针，项目中结构体都是用指针传递，节省空间。
		if claim, ok := tokenClaims.Claims.(*Claim); ok && tokenClaims.Valid {
			return claim, nil
		}
	}
	return nil, err
}
