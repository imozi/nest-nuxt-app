export const monthNumberToWord = (monthNumber: number, speller: boolean = false): string => {
  if (monthNumber < 0 || monthNumber > 11) {
    throw new Error('Номер месяца должен быть от 0 до 11');
  }

  const month = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];

  const spellerMonth = [
    'Января',
    'Февраля',
    'Марта',
    'Апреля',
    'Мая',
    'Июня',
    'Июля',
    'Августа',
    'Сентября',
    'Октября',
    'Ноября',
    'Декабря',
  ];

  return speller ? spellerMonth[monthNumber]! : month[monthNumber]!;
};
