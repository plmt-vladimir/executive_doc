import { useState } from "react";
import Textarea from "@/components/UI/Textarea";
import Button from "@/components/UI/Button";

export default function AOOKTestingTab() {
  const [text, setText] = useState("");

  return (
    <div className="flex flex-col gap-4 text-sm text-[--color-primary]">
      <p className="font-bold mb-4">
        6. Проведены необходимые испытания и обследования
      </p>

      <Textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Введите информацию об испытаниях и обследованиях"
        rows={20}
        className="w-full"
      />

      <div className="flex justify-end gap-2">
        <Button onClick={() => setText("")}>Очистить</Button>
        <Button>Применить</Button>
      </div>
    </div>
  );
}