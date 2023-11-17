import { isValidObjectId } from "mongoose";

const checkValidObjectID = (id) => {
  if (!id) {
    throw new Error("Id is missing");
  }
  if (!isValidObjectId(id)) {
    throw new Error("Invalid ID");
  }
};

export default checkValidObjectID;
