import { appService } from '@services/app.service';
import Button from '@mui/material/Button';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: Index,
});

function Index() {
  const handleClickSeedets = async () => {
    await appService.seeders();
  };
  const handleClickSeedetsOrders = async () => {
    await appService.seedersOrders();
  };
  return (
    <div className="p-2">
      <h3>Добро пожаловать</h3>
      <h4>Инструкция:</h4>
      <ul>
        <li>
          Заполнить тестовыми данными
          <Button
            variant="contained"
            onClick={handleClickSeedets}
            sx={{ ml: 2 }}
          >
            заполнить
          </Button>
        </li>
        <li>В Заказах отображаются заказы всех курьеров</li>
        <li>В заказах можно выбрать заказы и иметировать оплату</li>
        <li>
          В Курьерах отображаются курьеры и можно зайти под ним, чтобы увидеть
          заказы его заказы, при активации курьера можно посмотреть данные о нем
          в верхнем правом углу
        </li>
        <li>
          Можно довабить новые заказы
          <Button
            variant="contained"
            sx={{ ml: 2 }}
            onClick={handleClickSeedetsOrders}
          >
            Добавить
          </Button>
        </li>
      </ul>
    </div>
  );
}
