import { AxiosInstance } from "axios";
import { Course } from "../../interfaces/course.interface";
import { Deliverable } from "../../interfaces/deliveries.interface";
import { RESPONSES } from "../../interfaces/response-messages";
import { API_INSTANCE } from "../api-service";

export class DeliverableService {
  private API: AxiosInstance;
  private static instance: DeliverableService | null = null;

  public constructor() {
    this.API = API_INSTANCE;
  }

  async getDeliverables(course: string, page: number) {
    try {
      return await this.API.get<{
        count: number;
        deliverables: Deliverable[];
      }>(`deliverables/course/${course}`, {
        params: {
          page: page - 1,
        },
      });
    } catch (error: any) {
      return error.response.data.message;
    }
  }

  async getOneById(edit: string) {
    try {
      console.log(this.API.getUri() + `deliverables/${edit}`);
      
      return await this.API.get<Deliverable>(`deliverables/${edit}`);
    } catch (error: any) {
      return error.response.data.message;
    }
  }

  async createDeliverables(deriverable: Deliverable) {
    try {
      return await this.API.post<Deliverable>(`deliverables`, deriverable);
    } catch (error: any) {
      return error.response.data.message;
    }
  }

  async removeDeliverables(deriverable: Deliverable) {
    try {
      return await this.API.delete<Deliverable>(
        `deliverables/${deriverable._id}`
      );
    } catch (error: any) {
      return error.response.data.message;
    }
  }

  public async updateDeliverable(deriverable: Deliverable) {
    try {
      return await this.API.patch<Deliverable>(
        `deliverables/${deriverable._id}`,
        deriverable
      );
    } catch (error: any) {
      return error.response.data.message;
    }
  }
}
