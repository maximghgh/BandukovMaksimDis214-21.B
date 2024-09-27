<?php

class Calculator {
    // Метод для сложения двух чисел (принимает целые и дробные значения)
    public function add($a, $b) {
        $this->validate($a, $b);
        return $a + $b;
    }

    // Метод для вычитания двух чисел (принимает целые и дробные значения)
    public function subtract($a, $b) {
        $this->validate($a, $b);
        return $a - $b;
    }

    // Метод для умножения двух чисел (принимает целые и дробные значения)
    public function multiply($a, $b) {
        $this->validate($a, $b);
        return $a * $b;
    }

    // Метод для деления двух чисел (принимает целые и дробные значения)
    public function divide($a, $b) {
        $this->validate($a, $b);
        if ($b == 0) {
            throw new InvalidArgumentException("Деление на ноль");
        }
        return $a / $b;
    }

    // Метод для проверки значений
    private function validate($a, $b) {
        if (!isset($a) || !isset($b)) {
            throw new InvalidArgumentException("Одно из значений является пустым");
        }
    }
}

// // Пример использования
// $calc = new Calculator();
// echo $calc->add(10, 5); // 15
// echo $calc->subtract(10, 5); // 5
// echo $calc->multiply(10, 5); // 50
// echo $calc->divide(10, 5); // 2
?>
