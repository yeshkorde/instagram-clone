import { NextResponse } from "next/server";
import reelsModle from "@/app/models/reelsModle";
import connectToDatabase from "@/app/utils/dbConneaction";
import userModle from "@/app/models/userModle";

export async function GET(req, res) {
    try {
        await connectToDatabase();
        const reels = await reelsModle.find().populate({
            path: "userId",
            model: userModle,
        });
        return NextResponse.json({ reels });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}