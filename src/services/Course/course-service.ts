import { AxiosInstance } from "axios";
import { Course, PaginatedCourses } from "../../interfaces/course.interface";
import { API_INSTANCE } from "../api-service";

export class CourseService {
  private API: AxiosInstance;

  public constructor() {
    this.API = API_INSTANCE;
  }

  public async getUserCourses(userId: string, careerId: string, page: number) {
    try {
      return await this.API.get<PaginatedCourses>(
        `courses/user/${userId}/career/${careerId}`,
        {
          params: {
            page: page - 1, // Ajust por metodo de paginación del backend
          },
        }
      );
    } catch (error: any) {
      if (error.response) {
        return error.response.data.message;
      } else return error.message;
    }
  }

  async getCourseById(id: string) {
    try {
      return await this.API.get<Course>(`courses/${id}`);
    } catch (error: any) {
      if (error.response) {
        return error.response.data.message;
      } else return error.message;
    }
  }

  async getCourseGrade(id: string) {
    try {
      return await this.API.get<{ totalGrade: number }>(`courses/grade/${id}`);
    } catch (error: any) {
      if (error.response) {
        return error.response.data.message;
      } else return error.message;
    }
  }

  public async removeCourse(course: Course) {
    try {
      return await this.API.delete<Course>(`courses/${course._id}`);
    } catch (error: any) {
      if (error.response) {
        return error.response.data.message;
      } else return error.message;
    }
  }

  public async createCourse(course: Course) {
    try {
      return await this.API.post<Course>(`courses`, course);
    } catch (error: any) {
      if (error.response) {
        return error.response.data.message;
      } else return error.message;
    }
  }

  public async updateCourse(course: Course, courseId: string) {
    try {
      return await this.API.patch<Course>(`courses/${courseId}`, course);
    } catch (error: any) {
      if (error.response) {
        return error.response.data.message;
      } else return error.message;
    }
  }
}
