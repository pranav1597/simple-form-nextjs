import {connect} from '@/dbConfig/dbConfig'
import User from '@/models/userModels.js'
import { NextRequest, NextResponse } from 'next/server'
import bcryptjs from 'bcryptjs'
import { sendEmail } from '@/helpers/mailer'


 connect()

export async function POST(request: NextRequest) {
    try {
       const reqBody =  await request.json()
       const {username, email, password} = reqBody

       console.log(reqBody)
       if(!username || !email || !password) {
        return NextResponse.json({error: "Missing Credentials"}, {status: 400})
       }

       const user = await User.findOne({email})

       if(user) {
        return NextResponse.json({error: "User already exists"}, {status: 400})
       }

    //    encrypt password

    const salt = await bcryptjs.genSalt(10)
    const hashedPassword = await bcryptjs.hash(password, salt)

    const newUser = new User({
        username,
        email,
        password: hashedPassword
    })

    const savedUser = await newUser.save()
    console.log(savedUser)

    // send verification email

    try {
        await sendEmail({email, emailType: "VERIFY", userId: savedUser._id})
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
        
    }

    return NextResponse.json({
        message: "User created successfully",
        success: true,
        savedUser
    })

    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}