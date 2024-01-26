import { EmploeeInfo, ReqType, RequestInfo } from "../common/types";
import { Requests } from "./requests.js";

export class Queries {
    /**
     * Получение списка сотрудников
     */
    static async getEmploeeList(): Promise<EmploeeInfo[]> {
        return Requests.getEmploees();
    }

    /**
     * Получение сотрудника по id
     */
    static async getEmploee(id: string): Promise<EmploeeInfo> {
        return Requests.getEmploee(parseInt(id));
    }

    /**
     * Добавление сотрудника
     */
    static async addEmploee(emploee: EmploeeInfo): Promise<void> {
        return Requests.addEmploee(emploee);
    }

    /**
     * Удаление сотрудника
     */
    static async deleteEmploee(id: string): Promise<void> {
        return Requests.deleteEmploee(parseInt(id));
    }

    /**
     * Обновление сотрудника
     */
    static async updateEmploee(emploee: EmploeeInfo): Promise<void> {
        return Requests.updateEmploee(emploee);
    }

    /**
     * Получение списка оборудования
     */
    static async getReqTypesList(): Promise<ReqType[]> {
        return Requests.getReqTypes();
    }

    /**
     * Получение списка запросов сотрудника
     */
    static async getRequestList(id: string): Promise<RequestInfo[]> {
        return Requests.getRequests(parseInt(id));
    }

    /**
     * Добавление запроса
     */
    static async addRequest(request: RequestInfo): Promise<void> {
        return Requests.addRequest(request);
    }

    /**
     * Удаление запроса
     */
    static async deleteRequest(id: number): Promise<void> {
        return Requests.deleteRequest(id);
    }

    /**
     * Обновление запроса
     */
    static async updateRequest(request: RequestInfo): Promise<void> {
        return Requests.updateRequest(request);
    }
}