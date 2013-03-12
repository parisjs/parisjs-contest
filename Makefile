# From: http://ejohn.org/blog/keeping-passwords-in-source-control/
.PHONY: _pwd_prompt decrypt_conf encrypt_conf

CONF_FILE=config.json

# 'private' task for echoing instructions
_pwd_prompt:
	@echo "Contact francois@2metz.fr for the password."

# to create config.json
decrypt_conf: _pwd_prompt
	openssl cast5-cbc -d -in ${CONF_FILE}.cast5 -out ${CONF_FILE}
	chmod 600 ${CONF_FILE}

# for updating config.json
encrypt_conf: _pwd_prompt
	openssl cast5-cbc -e -in ${CONF_FILE} -out ${CONF_FILE}.cast5
