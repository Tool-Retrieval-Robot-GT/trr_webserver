import roslibpy
import atexit

class RosClient:
    def __init__(self, host='localhost', port=9090):
        """Initialize the ROS client and connect to the ROS bridge."""
        self.client = roslibpy.Ros(host=host, port=port)
        self.connect()

        # Store subscriber references to manage them easily
        self.subscribers = {}
    
    def connect(self):
        try:
            print("Connecting to ROS...")
            self.client.run(timeout=2)
            if self.client.is_connected:
                print('ROS connected successfully.')
            else:
                print('Failed to connect to ROS.')
        except Exception as e:
            print(f'Error connecting to ROS: {e}')

    def setup_subscriber(self, topic_name, message_type='std_msgs/String', callback=None):
        """Set up a ROS subscriber with a custom callback."""
        def default_callback(message):
            print(f"Received message on {topic_name}: {message}")

        subscriber = roslibpy.Topic(
            self.client, topic_name, message_type
        )
        subscriber.subscribe(callback or default_callback)
        self.subscribers[topic_name] = subscriber
        print(f"Subscribed to topic: {topic_name}")

    def unsubscribe(self, topic_name):
        """Unsubscribe from a specific topic."""
        if topic_name in self.subscribers:
            self.subscribers[topic_name].unsubscribe()
            del self.subscribers[topic_name]
            print(f"Unsubscribed from topic: {topic_name}")
        else:
            print(f"No active subscription for topic: {topic_name}")

    def close(self):
        """Cleanly close the ROS connection."""
        if self.client.is_connected:
            for topic, subscriber in self.subscribers.items():
                subscriber.unsubscribe()
            self.client.terminate()
            print("Disconnected from ROS.")

# Create a reusable instance for your backend
ros_client = RosClient(host='143.215.51.67', port=9090)

# Close the ROS instance when the app shuts down
atexit.register(ros_client.close)

