import bcrypt from 'bcryptjs'

const users = [
    {
        name: 'Admin User',
          email: 'admin@example.com',
          password: bcrypt.hashSync('123456', 10),
          isAdmin: true
    },
    {
        name: 'Nilan Dilhara',
          email: 'nilan@example.com',
          password: bcrypt.hashSync('123456', 10),
          
    },
    {
        name: 'sadun Tharinda',
          email: 'sadun@example.com',
          password: bcrypt.hashSync('123456', 10),
         
    },

]

export default users