cat >./src/lib/consts/base-url.json <<EOF
{
  "BASE_URL": "$(ipconfig getifaddr en0)"
}
EOF