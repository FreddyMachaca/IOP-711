import pygame
import random
import os
import requests

pygame.init()

# Pantalla
tamaño_pantalla = [650, 430]
color_fondo = (0, 120, 0)
pantalla = pygame.display.set_mode(tamaño_pantalla)
icon_path = "C:/Users/PC/Desktop/Poker-master/sonidos/boton.jpg"
icon_image = pygame.image.load(icon_path)
pygame.display.set_icon(icon_image)
pygame.display.set_caption("Mi Juego de Poker 1.0")
reloj = pygame.time.Clock()

# Coordenadas e imágenes
x_imagenes, y_imagenes = 50, 55
tamaño_cartas_inciales = (178, 169)
rotarcarta = 10
recortar_carta = (200, 200, 750, 700)
tamaño_cartas_ftr = (800, 750)
tamaño_boton = (110, 110)
ubica_boton = (475, 70)

# Botón play
ruta_boton = "C:/Users/PC/Desktop/Poker-master/sonidos/boton.jpg"
boton_play = pygame.image.load(ruta_boton)
boton_play = pygame.transform.scale(boton_play, tamaño_boton)

# Lista de manos y historial
lista_manos = []
historial = []
ruta_cartas = "C:/Users/PC/Desktop/Poker-master/cartas"
lista_cartas = os.listdir(ruta_cartas)

def mostrar_(siete_cartas):                        
    codif_num = {"2":2, "3":3, "4":4, "5":5, "6":6, "7":7, "8":8, "9":9, "T":10, "J":"J", "Q":"Q", "K":"K", "A":"A"}
    codif_pinta = {"C":"Trebol", "D":"Diamante", "S":"Picas", "H":"Corazon"}
    numero = []
    pinta = []
    carta = []
    cartas_mano = []
    for i in range(len(siete_cartas)):
        numero.append(codif_num[siete_cartas[i][0]])
        pinta.append(codif_pinta[siete_cartas[i][-1]])       

    for i in range(len(numero)):
        carta.append([numero[i], pinta[i]])             
    
    for i in range(len(carta)):
        cartas_mano.append(carta[i*7:i*7+7])
    cartas_mano = list(filter(lambda x: [] != x, cartas_mano))
    print(cartas_mano)
    
def check_hand(siete_cartas):
    numero = [i[0] for i in siete_cartas]
    pinta = [i[1] for i in siete_cartas]
    
    dic_num_cont = {i:numero.count(i) for i in numero}
    repeticion_num = sorted(dic_num_cont.values())
    dic_col_cont = {i:pinta.count(i) for i in pinta}
    repeticion_col = sorted(dic_col_cont.values())    
    
    cartas_ordenadas = {"2":2, "3":3, "4":4, "5":5, "6":6, "7":7, "8":8, "9":9, "T":10,"J":11, "Q":12, "K":13, "A":14}
    lista_numeros = [cartas_ordenadas[i] for i in numero]
    sorted_numbers = sorted(lista_numeros)
    
    if repeticion_col[-1] >= 5 and repeticion_col != [1,1,5] and repeticion_col != [1,6] and sorted_numbers[4]-sorted_numbers[3] == 1 and sorted_numbers[3]-sorted_numbers[2] == 1 and sorted_numbers[2]-sorted_numbers[1] == 1 and sorted_numbers[1]-sorted_numbers[0] == 1:
        print("escalera de color")
        historial.append("ESCALERA DE COLOR")
        sonido("straight flush")
    elif 4 in repeticion_num:
        print("POKER")
        historial.append("POKER")
        sonido("POKER")
    elif repeticion_num[-2:] == [2,3]:
        print("FULL HOUSE")
        historial.append("FULL HOUSE")
        sonido("full house")
    elif repeticion_col[-1] >= 5:
        print("COLOR")       
        historial.append("COLOR")
        sonido("COLOR")
    elif sorted_numbers[4]-sorted_numbers[3] == 1 and sorted_numbers[3]-sorted_numbers[2] == 1 and sorted_numbers[2]-sorted_numbers[1] == 1 and sorted_numbers[1]-sorted_numbers[0] == 1:
        print("ESCALERA")
        historial.append("ESCALERA")
        sonido("escalera")
    elif 14 in sorted_numbers and sorted_numbers[0:4] == [2,3,4,5]:
        print("ESCALERITA")     
        historial.append("ESCALERA")
        sonido("escalera")
    elif 3 in repeticion_num:
        print("TRIO")
        historial.append("TRIO")
        sonido("trio")
    elif repeticion_num == [1,1,1,2,2] or repeticion_num == [1,2,2,2]:
        print("DOS PARES")
        historial.append("DOS PARES")
        sonido("dos pares")
    elif repeticion_num == [1,1,1,1,1,2]:
        print("PAR")
        historial.append("PAR")
        sonido("un par")
    else:
        print("CARTA ALTA")
        historial.append("CARTA ALTA")
        sonido("Nada")

def sonido(ruta):
    pygame.mixer.music.load("C:/Users/PC/Desktop/Poker-master/sonidos/" + ruta + ".mp3")
    pygame.mixer.music.play(0)

def Poker():
    mi_imagen1 = pygame.image.load("C:/Users/PC/Desktop/Poker-master/sonidos/imagen1.png")
    mi_imagen1 = pygame.transform.scale(mi_imagen1, (17, 19))

    velocidad = 12
    posx = 0
    posy = 210  
    derecha = True
  
    salir = False
    pantalla.fill(color_fondo)  
    
    while not salir:      
        
        pantalla.blit(mi_imagen1, (posx, posy))        
        pantalla.blit(boton_play, ubica_boton)
        for event in pygame.event.get():
            mouse = pygame.mouse.get_pos()
            click = pygame.mouse.get_pressed()
            
            if event.type == pygame.QUIT:
                print("Total de manos jugadas:", int(len(lista_manos)/7),"")
                dic_hist_cont = {i:historial.count(i) for i in historial}
                print(dic_hist_cont)
                salir = True
              
            if event.type == pygame.KEYDOWN:
                if event.key == pygame.K_DOWN:
                    pass                    
            if event.type == pygame.MOUSEBUTTONDOWN:
                pass
            if ubica_boton[0] < mouse[0] < ubica_boton[0] + tamaño_boton[0] and ubica_boton[1] < mouse[1] < ubica_boton[1] + tamaño_boton[1]:
                if click[0] == 1:
                    colores = (250, 0, 0)
                    pygame.draw.rect(pantalla, colores, (ubica_boton[0]-10, ubica_boton[1]-10, tamaño_boton[0]+20, tamaño_boton[1]+20))
                    carta1, carta2, carta3, carta4, carta5, carta6, carta7 = random.sample(lista_cartas, 7)
                    siete_cartas = [carta1[0:2], carta2[0:2], carta3[0:2], carta4[0:2], carta5[0:2], carta6[0:2], carta7[0:2]]
                    
                    mostrar_(siete_cartas)
                    check_hand(siete_cartas)
                  
                    # Cargar imágenes iniciales
                    iniciales1 = pygame.image.load("C:/Users/PC/Desktop/Poker-master/cartas/" + carta1)
                    iniciales1 = pygame.transform.scale(iniciales1, tamaño_cartas_inciales)
                    iniciales1 = pygame.transform.rotate(iniciales1, rotarcarta)
                    iniciales2 = pygame.image.load("C:/Users/PC/Desktop/Poker-master/cartas/" + carta2)
                    iniciales2 = pygame.transform.scale(iniciales2, tamaño_cartas_inciales)
                    iniciales2 = pygame.transform.rotate(iniciales2, -rotarcarta)
                    
                    # Cargar imágenes del flop
                    flop1 = pygame.image.load("C:/Users/PC/Desktop/Poker-master/cartas/" + carta3)
                    flop1 = pygame.transform.scale(flop1, tamaño_cartas_ftr)
                    flop2 = pygame.image.load("C:/Users/PC/Desktop/Poker-master/cartas/" + carta4)
                    flop2 = pygame.transform.scale(flop2, tamaño_cartas_ftr)
                    flop3 = pygame.image.load("C:/Users/PC/Desktop/Poker-master/cartas/" + carta5)
                    flop3 = pygame.transform.scale(flop3, tamaño_cartas_ftr)

                    # Cargar imágenes de turn y river
                    turn = pygame.image.load("C:/Users/PC/Desktop/Poker-master/cartas/" + carta6)
                    turn = pygame.transform.scale(turn, tamaño_cartas_ftr)
                    river = pygame.image.load("C:/Users/PC/Desktop/Poker-master/cartas/" + carta7)
                    river = pygame.transform.scale(river, tamaño_cartas_ftr)
                       
                    # Iniciales
                    pantalla.blit(iniciales1, (x_imagenes*.4, y_imagenes-40))
                    pantalla.blit(iniciales2, (x_imagenes*3, y_imagenes-40))
                    # Flop
                    pantalla.blit(flop1, (x_imagenes-40, y_imagenes*4.2))
                    pantalla.blit(flop2, (x_imagenes*2.6, y_imagenes*4.2))
                    pantalla.blit(flop3, (x_imagenes*5.1, y_imagenes*4.2))
                    # Turn y river
                    pantalla.blit(turn, (x_imagenes*7.6, y_imagenes*4.2))
                    pantalla.blit(river, (x_imagenes*10.1, y_imagenes*4.2))

                    for i in siete_cartas:
                        lista_manos.append(i)
                
        if derecha == True:
            if posx < 650:
                posx += velocidad
            else:
                derecha = False
        else:
            if posx > 1:
                posx -= velocidad
            else:
                derecha = True
                
        pygame.display.update()
        reloj.tick(20)

Poker()
pygame.quit()
