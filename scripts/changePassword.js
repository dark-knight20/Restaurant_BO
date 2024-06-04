function changePassword(username)
{
   let credentials=localStorage.getItem('credentials');
   let newPassword=document.getElementById('').value;
   for (user of credentials['users'])
    {
        if(username==user.username)
            {
                if(document.getElementById('').value==user.phn_number)
                    {
                        user.password=newPassword;
                    }
            }
    }
}
