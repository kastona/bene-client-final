export default function ({$auth, redirect, store}) {
  const user = $auth.user
  if(user && user.admin) {

  }else {
    redirect('/')
  }
}
