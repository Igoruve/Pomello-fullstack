# Pomello
DESCRIPCIÓN DEL PROYECTO:

Proyecto fullStack que combina un clon de Trello con funcionalidad para gestionar el tiempo con el método Pomodoro. Por un lado, tenemos un apartado de gestión de tableros con proyectos, listas y tareas. Por otro, tenemos un cronómetro en el que puedes especificar el tiempo de focus de trabajo y que te calcule en función de ese tiempo un descanso acorde al método Pomodoro. Además de esto, Pomello registra las estadísticas del usuario.

📌 Consideraciones para la Implementación
Captura de eventos de inicio y detención: Cuando el usuario inicie o detenga el cronómetro, se deben actualizar los campos chronostarted y chronostopped respectivamente. Esto permitirá calcular la duración de cada sesión y determinar si fue completada o interrumpida.

Cálculo de sesiones completadas: Una sesión se considera completada si la duración entre chronostarted y chronostopped es igual o superior a la duración de enfoque (focusDuration).

Preparación para estadísticas: Almacenar estos datos permitirá generar estadísticas como el número de sesiones completadas, sesiones interrumpidas y tiempos totales de enfoque y descanso, que podrán visualizarse mediante gráficos en el frontend.


✅ Lógica estructural del chronometro

Modelo: recreación en base datos del planteamiento lógico.
Controlador: Implementar las funciones que manejen las solicitudes relacionadas con el cronómetro, como iniciar, detener y obtener estadísticas.
Rutas: Definir las rutas de la API que permitan interactuar con el cronómetro, asegurando que estén protegidas mediante autenticación.
Middleware de Autenticación: Asegurarse de que solo los usuarios autenticados puedan acceder y modificar sus datos del cronómetro.
Integración con el Frontend: Diseñar la interfaz de usuario que permita iniciar y detener el cronómetro, así como visualizar las estadísticas recopiladas.
