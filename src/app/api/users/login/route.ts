import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModels.js";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;

    console.log(reqBody);

    if (!email || !password) {
      return NextResponse.json(
        { error: "Missing Credentials" },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { error: "User does not exist" },
        { status: 400 }
      );
    }

    const validPassword = await bcryptjs.compare(password, user.password);
    if (!validPassword) {
      return NextResponse.json(
        { error: "Invalid Password" },
        { status: 400 }
    )}

    //create token data

    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
    }

    console.log("Token Data ", tokenData)

    // create token
    
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1d",
    });

    console.log("Token ", token)

    const response = NextResponse.json({
      message: "Login Successfull",
      success: true,
    });

    response.cookies.set("token", token, {
      httpOnly: true,
    });

    return response


    

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
