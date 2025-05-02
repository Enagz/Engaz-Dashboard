import Avatar from "@/assets//userImage/user.jpg";
import CompletedOrders from "@/components/charts/CompletedOrders";
import CompletionRate from "@/components/charts/CompletionRate";
import CompletionTime from "@/components/charts/CompletionTime";
import CustomersRate from "@/components/charts/CustomersRate";
import Input from "@/components/forms/Input";
import Tasks from "@/components/tables/Tasks";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { User } from "lucide-react";
import { useState } from "react";

const EmployeeProfile = () => {
  const formInfo = {
    idNumber: "1023456789",
    fullName: "سالم علي الدوسري",
    city: "الرياض، السعودية",
    phoneNumber: "+966 501234567",
    employmentDate: "15 فبراير 2024",
    department: "ترجمة",
  };

  const [idNumber, setIdNumber] = useState(formInfo.idNumber);
  const [fullName, setFullName] = useState(formInfo.fullName);
  const [city, setCity] = useState(formInfo.city);
  const [phoneNumber, setPhoneNumber] = useState(formInfo.phoneNumber);
  const [employmentDate, setEmploymentDate] = useState(formInfo.employmentDate);
  const [department, setDepartment] = useState(formInfo.department);
  const [disabled, setDisabled] = useState(true);

  return (
    <div>
      <p className="mb-6 font-semibold text-2xl">ملفي الشخصي</p>

      {/* form */}
      <div className="bg-white py-6 px-8 rounded-2xl shadow-[0_0_4px_rgba(62,151,209,0.25)]">
        {/* header */}
        <div className="flex flex-col sm:flex-row justify-between">
          <div className="flex gap-x-4 items-start">
            <img
              src={Avatar}
              alt="username"
              className="w-10 aspect-square rounded-full"
            />

            <div dir="rtl" className="flex flex-col items-end">
              <div className="font-bold text-xl">سالم الدوسري</div>
              <div className="text-text-normal text-xs">
                salem.aldosari@example.com
              </div>
            </div>
          </div>

          <button
            onClick={() => setDisabled(false)}
            className="font-semibold px-6 py-2.5 bg-primary-color text-white rounded-sm hover:bg-primary-color/90"
          >
            تعديل
          </button>
        </div>

        <form className="mt-2 grid lg:grid-cols-2 gap-x-10 gap-y-6">
          {/* Full Name Field */}
          <div className="flex flex-col gap-2">
            <label className="font-semibold" htmlFor="fullname">
              الإسم الكامل :
            </label>
            <Input
              disabled={disabled}
              type="text"
              label={"fullname"}
              value={fullName}
              onValueChange={setFullName}
              placeholder="سالم علي الدوسري"
              icon={<User />}
            />
          </div>

          {/* ID Number Field */}
          <div className="flex flex-col gap-2">
            <label className="font-semibold" htmlFor="idNumber">
              رقم الهوية :
            </label>
            <Input
              disabled={disabled}
              type="number"
              label={"idNumber"}
              value={idNumber}
              onValueChange={setIdNumber}
              placeholder="1023456789"
              icon={<User />}
            />
          </div>

          {/* Phone Number Field */}
          <div className="flex flex-col gap-2">
            <label className="font-semibold" htmlFor="phoneNumber">
              رقم الهاتف :
            </label>
            <Input
              disabled={disabled}
              type="text"
              label={"phoneNumber"}
              value={phoneNumber}
              onValueChange={setPhoneNumber}
              placeholder="+966 501234567"
              icon={<User />}
            />
          </div>

          {/* City Field */}
          <div className="flex flex-col gap-2">
            <label className="font-semibold" htmlFor="city">
              المدينة :
            </label>
            <Input
              disabled={disabled}
              type="text"
              label={"city"}
              value={city}
              onValueChange={setCity}
              placeholder="الرياض، السعودية"
              icon={<User />}
            />
          </div>

          {/* Department Field */}
          <div className="flex flex-col gap-2">
            <label className="font-semibold" htmlFor="department">
              القسم :
            </label>
            <Input
              disabled={disabled}
              type="text"
              label={"department"}
              value={department}
              onValueChange={setDepartment}
              placeholder="ترجمة"
              icon={<User />}
            />
          </div>

          {/* Employment Date Field */}
          <div className="flex flex-col gap-2">
            <label className="font-semibold" htmlFor="employmentDate">
              تاريخ التوظيف :
            </label>
            <Input
              disabled={disabled}
              type="date"
              label={"employmentDate"}
              value={employmentDate}
              onValueChange={setEmploymentDate}
              placeholder="15 فبراير 2024"
              icon={<User />}
            />
          </div>

          {/* buttons */}
          {!disabled && (
            <div className="flex gap-x-6">
              <button
                type="submit"
                className="font-semibold px-6 py-2.5 bg-primary-color text-white rounded-sm hover:bg-primary-color/90"
              >
                حفظ
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setDisabled(true);
                }}
                className="font-semibold px-6 py-2.5 bg-error-color text-white rounded-sm hover:bg-error-color/90"
              >
                إلغاء
              </button>
            </div>
          )}
        </form>
      </div>

      {/* section */}
      <div className="mt-6 flex flex-col gap-y-6">
        <p className="font-semibold text-2xl">ملخص الأداء الشهري</p>

        <div className="grid sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 gap-4 2xl:gap-10">
          <Card className="max-h-96 rounded-3xl bg-white border-none">
            <CardHeader>
              <p className="font-semibold">عدد الطلبات المنجزة :</p>
            </CardHeader>
            <CompletedOrders />
            <CardFooter>
              <p className="font-semibold text-xs text-text-normal w-full text-center">
                تحسن بمقدار 10% عن الشهر الماضي
              </p>
            </CardFooter>
          </Card>

          <Card className="max-h-96 rounded-3xl bg-white border-none">
            <CardHeader>
              <p className="font-semibold">تحليل نسبة الإنجاز :</p>
            </CardHeader>
            <CompletionRate />
          </Card>

          <Card className="max-h-96 rounded-3xl bg-white border-none">
            <CardHeader>
              <p className="font-semibold">متوسط وقت الإنجاز :</p>
            </CardHeader>
            <CompletionTime />
            <CardFooter>
              <p className="font-semibold text-xs text-text-normal w-full text-center">
                أفضل من المتوسط العام بنسبة 20%
              </p>
            </CardFooter>
          </Card>

          <Card className="max-h-96 rounded-3xl bg-white border-none">
            <CustomersRate />
          </Card>
        </div>
      </div>

      {/* section */}
      <div className="mt-6 flex flex-col gap-y-6">
        <p className="font-semibold text-2xl">جدول المهمات</p>

        <Tasks />
      </div>
    </div>
  );
};

export default EmployeeProfile;
