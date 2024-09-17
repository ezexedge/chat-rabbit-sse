import { injectable } from "tsyringe";

@injectable()
export default class ChatService {
  public getChat(): string {
    return `hello chat`;
  }
}
