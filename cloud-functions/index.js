exports.handler = (req, resp, context) => {
  const result = JSON.stringify({
    count: 6,
    message: 'Hello from Alibaba Cloud!'
  })

  resp.writeHead(200, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  })
  resp.end(result)
}
