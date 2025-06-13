import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";

connect();

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const token = searchParams.get('token');
        
        console.log("Received token:", token);
        
        if (!token) {
            return NextResponse.json({ error: "Token is required" }, { status: 400 });
        }

        // Find all users with non-expired tokens for debugging
        const users = await User.find({
            verifyTokenExpiry: { $gt: Date.now() }
        });
        console.log("Found users with non-expired tokens:", users.length);

        // Try to find a user where the token matches
        let verifiedUser = null;
        for (const user of users) {
            const isValid = await bcryptjs.compare(token, user.verifyToken);
            if (isValid) {
                verifiedUser = user;
                break;
            }
        }

        if (!verifiedUser) {
            return NextResponse.json({ error: "Invalid or expired token" }, { status: 400 });
        }

        verifiedUser.isVerified = true;
        verifiedUser.verifyToken = undefined;
        verifiedUser.verifyTokenExpiry = undefined;
        await verifiedUser.save();

        return NextResponse.json({ message: "Email verified successfully", success: true });
    } catch (error: any) {
        console.log("Error in verification:", error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { token } = reqBody;
        
        if (!token) {
            return NextResponse.json({ error: "Token is required" }, { status: 400 });
        }

        const user = await User.findOne({
            verifyTokenExpiry: { $gt: Date.now() }
        });

        if (!user) {
            return NextResponse.json({ error: "Invalid or expired token" }, { status: 400 });
        }

        const isValid = await bcryptjs.compare(token, user.verifyToken);
        if (!isValid) {
            return NextResponse.json({ error: "Invalid token" }, { status: 400 });
        }

        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;
        await user.save();

        return NextResponse.json({ message: "Email verified successfully", success: true });
    } catch (error: any) {
        console.log(error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
