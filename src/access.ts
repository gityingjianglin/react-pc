import { history } from 'umi'

history.block((location, action) => {
  if(1) {
    debugger
    return 'Are you sure you want to leave this page?';
  }
})
