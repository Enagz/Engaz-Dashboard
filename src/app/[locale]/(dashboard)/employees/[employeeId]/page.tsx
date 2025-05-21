"use client";

import CompletedOrders from "@/components/charts/CompletedOrders";
import EmployeeDetailsForm from "@/components/forms/EmployeeDetailsForm";
import Tasks from "@/components/tables/Tasks";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { enjazService } from "@/services/enjazService";
import { use, useEffect, useState } from "react";
import { useTranslations } from "next-intl";

export interface FormInfo {
  fullName: string;
  phoneNumber: string;
  department: string;
  email: string;
}

type Params = Promise<{ employeeId: string }>;

export default function EmployeeDetails(props: { params: Params }) {
  const params = use(props.params);
  const employeeId = params.employeeId;

  const t = useTranslations("employeeDetails");

  const [initialData, setInitialData] = useState<any>(null);
  const [generalError, setGeneralError] = useState("");

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await enjazService.getEmployeeDetails(employeeId);
        const data = response.data;

        setInitialData({
          formInfo: {
            fullName: data.profile.name,
            phoneNumber: data.profile.phone,
            department: data.profile.department,
            email: data.profile.email,
          },
          numbers: [
            {
              completed: data.completedOrders,
              incompleted: data.missions.length - data.completedOrders,
            },
          ],
          tasks: data.missions.map((task: any) => ({
            taskNumber: task.number,
            client: task.client,
            task: task.mission,
            language:
              task.mission === "printing"
                ? "---"
                : `${task.languges?.from} / ${task.languges?.to?.join("-")}`,
            method: task.delivery,
            status: task.status,
            deliveryDate: task.date,
            comments: task.notes,
          })),
        });
      } catch (err) {
        console.error("Failed to fetch employee details", err);
        setGeneralError(t("fetchError"));
      }
    };

    if (employeeId) fetchEmployee();
  }, [employeeId, t]);

  if (!initialData) {
    return <p className="text-center mt-10">{t("loading")}</p>;
  }

  return (
    <div>
      <p className="mb-6 font-semibold text-2xl">{t("title")}</p>

      <EmployeeDetailsForm info={initialData.formInfo} />

      {/* Performance Summary */}
      <div className="mt-6 flex flex-col gap-y-6">
        <p className="font-semibold text-2xl">{t("monthlySummary")}</p>
        <Card className="max-h-96 rounded-3xl bg-white border-none">
          <CardHeader>
            <p className="font-semibold">{t("completedOrders")}</p>
          </CardHeader>
          <CompletedOrders chartData={initialData.numbers} />
          <CardFooter></CardFooter>
        </Card>
      </div>

      {/* Tasks Table */}
      <div className="mt-6 flex flex-col gap-y-6">
        <p className="font-semibold text-2xl">{t("taskTable")}</p>
        <Tasks rowData={initialData.tasks} />
      </div>
    </div>
  );
}
