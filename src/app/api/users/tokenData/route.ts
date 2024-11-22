import { getDataFromToken } from "@/helpers/getDataFromTokens";
import {NextRequest, NextResponse} from "next/server";
import User from "@/models/userModels";
import {connect} from "@/dbConfig/dbConfig";

connect()


export async function GET(request: NextRequest) {
    try {
        const userId = await getDataFromToken(request)
        console.log("User id: ", userId)
        const user = await User.findById({_id: userId}).select('-password')
        console.log("User: ", user)
        return NextResponse.json(
            {
                message: "User found",
                data: user
            }
        )
    } catch (error:any) {
        throw new Error("Error getting token data ",error.message)
    }
}

