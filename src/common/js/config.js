let url
if(process.env.NODE_ENV == 'development'){
  url = ''
}
if(process.env.NODE_ENV == 'production'){
  url = ''
}

export const ERR_OK = 200
export const HOST = url


