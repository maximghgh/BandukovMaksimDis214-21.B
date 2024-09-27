<?php

use PHPUnit\Framework\TestCase;

class CalculatorTest extends TestCase {

    // Тест сложения целых чисел
    public function testAddIntegers() {
        $calculator = new Calculator();
        $this->assertEquals(5.0, $calculator->add(2, 3), "2 + 3 должно быть 5");
    }

    // Тест вычитания целых чисел
    public function testSubtractIntegers() {
        $calculator = new Calculator();
        $this->assertEquals(1.0, $calculator->subtract(3, 2), "3 - 2 должно быть 1");
    }

    // Тест сложения дробных чисел
    public function testAddDoubles() {
        $calculator = new Calculator();
        $this->assertEquals(5.5, $calculator->add(2.2, 3.3), "2.2 + 3.3 должно быть 5.5");
    }

    // Тест вычитания дробных чисел
    public function testSubtractDoubles() {
        $calculator = new Calculator();
        $this->assertEquals(0.7, $calculator->subtract(3.0, 2.3), "", 0.001);
    }

    // Тест на пустое значение
    public function testAddWithNull() {
        $calculator = new Calculator();
        $this->expectException(InvalidArgumentException::class);
        $this->expectExceptionMessage("Одно из значений является пустым");
        $calculator->add(null, 3);
    }

    // Тест на смешанные значения: целое и дробное
    public function testAddMixedTypes() {
        $calculator = new Calculator();
        $this->assertEquals(5.5, $calculator->add(2, 3.5), "2 + 3.5 должно быть 5.5");
    }

    // Тест на вычитание с целыми и дробными числами
    public function testSubtractMixedTypes() {
        $calculator = new Calculator();
        $this->assertEquals(1.5, $calculator->subtract(5, 3.5), "5 - 3.5 должно быть 1.5");
    }

    // Тест умножения целых чисел
    public function testMultiplyIntegers() {
        $calculator = new Calculator();
        $this->assertEquals(6.0, $calculator->multiply(2, 3), "2 * 3 должно быть 6");
    }

    // Тест умножения дробных чисел
    public function testMultiplyDoubles() {
        $calculator = new Calculator();
        $this->assertEquals(7.26, $calculator->multiply(2.2, 3.3), "", 0.001);
    }

    // Тест деления целых чисел
    public function testDivideIntegers() {
        $calculator = new Calculator();
        $this->assertEquals(2.0, $calculator->divide(6, 3), "6 / 3 должно быть 2");
    }

    // Тест деления дробных чисел
    public function testDivideDoubles() {
        $calculator = new Calculator();
        $this->assertEquals(2.0, $calculator->divide(6.6, 3.3), "", 0.001);
    }

    // Тест на деление на ноль
    public function testDivideByZero() {
        $calculator = new Calculator();
        $this->expectException(InvalidArgumentException::class);
        $this->expectExceptionMessage("Деление на ноль");
        $calculator->divide(5, 0);
    }

    // Тест на пустое значение при делении
    public function testDivideWithNull() {
        $calculator = new Calculator();
        $this->expectException(InvalidArgumentException::class);
        $this->expectExceptionMessage("Одно из значений является пустым");
        $calculator->divide(null, 3);
    }
}
?>
