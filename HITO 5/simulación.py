import collections
import random

PALOS = ['espadas', 'corazones', 'rombos', 'trebol'] # Picas, Corazones, Diamantes, Tréboles
VALORES = ['as', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'jota', 'reina', 'rey'] # A, 2, 3, 4, 5, 6, 7, 8, 9, 10, J, Q, K

def crear_baraja(): # Función para crear la baraja
    barajas = [] # Lista vacía para almacenar las cartas
    for palo in PALOS: # Ciclo para recorrer los palos
        for valor in VALORES: # Ciclo para recorrer los valores
            barajas.append((palo, valor)) # Agregar las cartas a la lista
    return barajas # Retornar la lista

def obtener_mano(barajas, tamano_mano): # Función para obtener la mano
    mano = random.sample(barajas, tamano_mano) # Obtener una muestra aleatoria de la baraja
    return mano # Retornar la mano

def main(tamano_mano, intentos): # Función principal
    barajas = crear_baraja() # Crear la baraja
    manos = [] # Lista vacía para almacenar las manos
    for _ in range(intentos): # Ciclo para recorrer los intentos
        mano = obtener_mano(barajas, tamano_mano) # Obtener la mano
        manos.append(mano) # Agregar la mano a la lista

    pares = 0 # Contador de pares
    for mano in manos: # Ciclo para recorrer las manos
        valores = [] # Lista vacía para almacenar los valores
        for carta in mano: # Ciclo para recorrer las cartas de la mano
            valores.append(carta[1]) # Agregar los valores a la lista

        counter = dict(collections.Counter(valores)) # Contar los valores
        for val in counter.values(): # Ciclo para recorrer los valores
            if val == 2: # Si el valor se repite dos veces
                pares += 1 # Aumentar el contador
                break # Salir del ciclo
    probabilidad_par = pares / intentos # Calcular la probabilidad
    print(f'La probabilidad de obtener un par en una mano de {tamano_mano} cartas es {probabilidad_par}')

if __name__ == '__main__':
    tamano_mano = int(input('De cuantas cartas será la mano: '))
    intentos = int(input('Cuantos intentos para calcular la probabilidad: '))
    main(tamano_mano, intentos)

