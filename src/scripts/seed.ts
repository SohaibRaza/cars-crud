import * as mongoose from 'mongoose';
import * as dotenv from 'dotenv';

import bcrypt from '~common/helpers/bcrypt';
import { CommentsSchema } from '~modules/comments/comments.model';
import { PostsSchema } from '~modules/posts/posts.model';
import { UsersSchema } from '~modules/users/users.model';

dotenv.config();

async function seedData() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);

    // Create users
    const User = mongoose.model('Users', UsersSchema);
    const password = await bcrypt.hash('1234');

    const user1 = new User();
    user1.username = 'john';
    user1.email = 'john@example.com';
    user1.password = password;

    const user2 = new User();
    user2.username = 'jane';
    user2.email = 'jane@example.com';
    user2.password = password;

    // Save users
    await user1.save();
    await user2.save();

    // Create posts
    const Post = mongoose.model('Posts', PostsSchema);
    const post1 = new Post();
    post1.title = 'First Post';
    post1.content = 'This is the content of the first post.';
    post1.author = user1;

    const post2 = new Post();
    post2.title = 'Second Post';
    post2.content = 'This is the content of the second post.';
    post2.author = user2;

    // Save posts
    await post1.save();
    await post2.save();

    // Create comments
    const Comment = mongoose.model('Comments', CommentsSchema);
    const comment1 = new Comment();
    comment1.content = 'This is the first comment.';
    comment1.author = user1;
    comment1.post = post1;

    const comment2 = new Comment();
    comment2.content = 'This is the second comment.';
    comment2.author = user2;
    comment2.post = post2;

    // Save comments
    await comment1.save();
    await comment2.save();

    console.log('Data seeded successfully!');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    // Disconnect from MongoDB
    await mongoose.disconnect();
  }
}

seedData();
